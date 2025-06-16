import fetch from 'node-fetch';

export default async function handler(req, res) {
  // 你的原始订阅地址，先留空，后续你填
  const originalUrl = 'https://gitlab.com/yourname/project/-/raw/main/clash.yaml';

  // 代理请求，拉取原始配置文件
  const response = await fetch(originalUrl, {
    headers: {
      'User-Agent': 'Clash',
      'Accept': '*/*'
    }
  });

  if (!response.ok) {
    res.status(500).send('Failed to fetch subscription');
    return;
  }

  const text = await response.text();

  // 设置 Clash 订阅必须的响应头
  res.setHeader('content-disposition', 'attachment; filename="clash.yaml"');
  res.setHeader('profile-update-interval', '24');
  res.setHeader('subscription-userinfo', 'upload=0; download=0; total=0; expire=0');
  res.setHeader('profile-web-page-url', 'https://gitlab.com/yourname/project');

  // 返回内容
  res.status(200).send(text);
}
