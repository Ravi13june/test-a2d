import jwtDecode from "jwt-decode";

const WithAuth = (WrappedComponent) => (props) => {
  if (typeof window !== "undefined") {
    try {
      const decodeToken = String(
        localStorage.getItem('access_token')
      );
      const isUser = jwtDecode(decodeToken);
      console.log(isUser,'isUser')
     if (isUser.userId) return <WrappedComponent {...props} />;
     throw new Error('MESSAGE_TYPE.UNAUTHORISED_USER');
    } catch (err) {
      localStorage.removeItem('access_token');
      window.open("/", "_self");
     
    }
  }
  return <WrappedComponent {...props} />;
};

export default WithAuth;
