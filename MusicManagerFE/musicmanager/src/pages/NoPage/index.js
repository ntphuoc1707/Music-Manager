import { localhost, path } from "../../res";

function NoPage() {

    const pathName=window.location.pathname.replace('/','');
    const href=window.location.href.replace(pathName,'')

    
    if (Object.values(path).includes(pathName)) {
        return (
            <h1 style={{textAlign: "center"}}>
                {"Please "}
                <a href={href+path.LOGIN} onClick={localStorage.clear()}>
                login 
                </a>
            </h1>
        );
    }
    else {
        return (
            <h1 style={{ width: "100%", textAlign: "center" }} >Wrong address!!!</h1>
        );
    }


}

export default NoPage;