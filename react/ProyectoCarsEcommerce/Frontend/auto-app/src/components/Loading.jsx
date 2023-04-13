import '../styles/Loading.css';

export default function Loading() {
    return (
        <>
            <div className="loading-conatiner">
                <h1>Cargando</h1>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        </>
    );
};