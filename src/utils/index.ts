export const regEmail =
  /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
export const validatorEmail = (_rule: any, value: any, callback: any) => {
  if (regEmail.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱格式错误"));
  }
};

export const regPhone =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

export const validatorMobile = (_rule: any, value: any, callback: any) => {
  if (regPhone.test(value)) {
    callback();
  } else {
    callback(new Error("手机号码格式错误"));
  }
};

export const regCreditCode =
  /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/;

export const validatorCreditCode = (_rule: any, value: any, callback: any) => {
  if (regCreditCode.test(value)) {
    callback();
  } else {
    callback(new Error("社会统一信用代码格式错误"));
  }
};

export function downloadFile(url: string, filename?: string) {
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((res) => {
      if (res.status == 200) {
        return res.blob();
      }

      throw new Error(`status: ${res.status}.`);
    })
    .then((blob) => {
      download(blob, filename);
    });
}
export function download(blob: Blob, filename?: string) {
  const a: any = document.createElement("a");
  a.download = filename;
  const blobUrl = URL.createObjectURL(blob);
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
}
