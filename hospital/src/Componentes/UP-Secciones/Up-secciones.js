import "./Up-secciones.css";

function Up_Secciones() {
    const Secciones = {
        title: "Hospital San Jorge de Ayapel", 
        parrafo: "El Hospital San Jorge de Ayapel es un centro de salud ubicado en Ayapel, una pequeña ciudad en el departamento de Córdoba, Colombia. Ayapel es una zona que se encuentra en la región de los Montes de María, una región agrícola y ganadera de Colombia..",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTztqyAKTnWIr8rhJwEwCkT91ZoyeNpd3FZ3g&s"
    };

    return (  
        <div id="seccion">
            <img id="img" src={Secciones.imagen} alt="Sailing boat" />
            <div className="content">
                <h1 id="tl">{Secciones.title}</h1>
                <p id="pr">{Secciones.parrafo}</p>
            </div>
        </div>
    );
}

export default Up_Secciones;
