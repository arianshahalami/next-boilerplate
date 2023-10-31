import {PropsWithChildren} from "react";

function AuthPageLayout({children}: PropsWithChildren) {
    return <div className="auth-layout">{children}</div>;
}

export default AuthPageLayout;
