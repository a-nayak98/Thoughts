const validation = () => {
    if (
        !formData.image ||
        formData.title.length < 15 ||
        errorMessage.length > 1
      ) {
        setError(true);
      }
      // scroll to title error section
      if (formData.title.length == 0) {
        toast.error("Enter title!!!");
        return scrollToSection(form_title);
      }
      if (formData.title.length < 15) {
        toast.error("Title Must Be 30 charters length.");
        return scrollToSection(form_title);
      }
      //scroll to image error section
      if (!formData.image) {
        toast.error("Kindly Select an Image.");
        return scrollToSection(form_image);
      }
      // scroll to description error section
      if (formData.description < 1) {
        toast.error("Yuu are missing out Something Here.");
        return scrollToSection(form_description);
      }

};

export default {
  validation,
};
