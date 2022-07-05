import request from "@/utils/request";
// 获取登录接口
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};
// 获取短信验证码接口
export const OnSendMsM = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
