import Swal from "sweetalert2";

export const simpleNofication = (
  text: string,
  customStyle: string,
  backGround?: string
) => {
  Swal.fire({
    width: "80%",
    html: '<span style="' + customStyle + '">' + text + "</span>",
    background: backGround,
  });
};

export const simpleImage = (
  image: any,
  customStyle?: string,
  backGround?: string
) => {
  Swal.fire({
    width: "60%",
    background: "rgba(0, 0, 0, 0.8)",
    imageUrl: image,
  });
};

export const success = (text: string) => {
  Swal.fire(text, "", "success");
};

export const failure = (text: string) => {
  Swal.fire({
    icon: "error",
    title: "Có lỗi không xác định xảy ra",
    text: text,
  });
};
