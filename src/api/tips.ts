import request from "../utils/http";

interface InputTipsReq {
  keywords: string;
}

interface InputTip {
  id: string;
  name: string;
  district: string;
  address: string;
  location: string;
}

interface InputTipsRes {
  count: number;
  info: string;
  status: string;
  tips: InputTip[];
}

export const getInputTips = (params: InputTipsReq) => {
  return request({
    url: "/v3/assistant/inputtips",
    params: {
      city: "成都",
      datatype: "poi",
      key: import.meta.env.VITE_KEY,
      ...params,
    },
  }) as Promise<InputTipsRes>;
};
