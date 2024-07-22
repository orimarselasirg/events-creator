import Swal, { SweetAlertIcon } from "sweetalert2";

interface Params {
  title:              string;
  text:               string;
  confirmButtonText:  string;
  resultsTitle:       string;
  resultText:         string;
  iconAlert:          SweetAlertIcon
  iconSucess:         SweetAlertIcon;
}

export const confirmationAlert = ({
  title,
  text,
  confirmButtonText,
  resultText,
  resultsTitle,
  iconAlert,
  iconSucess
}: Params): Promise<boolean | undefined> => {
  const isAproved = Swal.fire({
    title:              title,
    text:               text,
    icon:               iconAlert,
    showCancelButton:   true,
    confirmButtonColor: "#C70039",
    cancelButtonColor:  "#222427",
    confirmButtonText:  confirmButtonText,
    iconColor:          '#C70039'
  }).then((result) => {
   if (result.isConfirmed) {
      Swal.fire({
        title:              resultsTitle,
        text:               resultText,
        icon:               iconSucess,
        iconColor:          '#222427',
        confirmButtonColor: '#222427'
      });
      return  true
    }
    if(result.isDenied || result.isDismissed) {
      return false
    }
  });
  return isAproved
}