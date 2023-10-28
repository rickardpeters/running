import AuthHeader from "./AuthHeader";

interface HeaderProps {
  auth: boolean;
}

const Header = (props: HeaderProps) => {
  return <>{props.auth && <AuthHeader />}</>;
};

export default Header;
