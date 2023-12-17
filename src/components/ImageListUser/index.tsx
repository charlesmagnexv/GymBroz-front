import React, { useState } from "react";
import { 
    ImageList, 
    ImageListItem
} from "@mui/material";

const ImageListUser: React.FC = () => {

    const itemData = [
        {
          img: 'https://tenoblog.com/wp-content/uploads/2017/11/jogging.jpg',
          title: 'Corrida',
        },
        {
          img: 'https://www.atlasdasaude.pt/sites/default/files/artigos_images/idoso_exercicio_desporto_ss_0.jpg',
          title: 'Alongamento1',
        },
        {
          img: 'https://blog.drconsulta.com/wp-content/uploads/2017/07/shutterstock_504878254.jpg',
          title: 'LevantarPeso',
        },
        {
          img: 'https://img-21.ccm2.net/8wIDT3zbjhB9c6X6R1Yppah7WCU=/a17964f5082143548b181226cb24aa02/ccm-faq/1088618.jpg',
          title: 'Agachamento',
        },
        {
          img: 'https://i0.wp.com/www.carrijo.com.br/wp-content/uploads/2020/03/Futsal-Seletiva-Arquivo-1.jpg?resize=3552%2C2368',
          title: 'Futsal',
        },
        {
          img: 'https://abdem.com.br/wp-content/uploads/2017/12/nata%C3%A7%C3%A3o-zumbido.jpg',
          title: 'Natação',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
        },
        {
          img: 'https://www.clinicaphysico.com.br/wp-content/uploads/2022/10/Seguro-de-vida-Jogadores.jpg',
          title: 'Futebol',
        },
        {
          img: 'https://mxbikes.com.br/blog/img/imagens_colunas/foto_2672.jpg',
          title: 'Ciclismo',
        },
        {
          img: 'https://imagem.band.com.br/f_465943.jpg',
          title: 'Vôlei',
        },
        {
          img: 'https://2.bp.blogspot.com/-rQ2-BsJjHYc/UOd6JdaepWI/AAAAAAAADEI/GcspwducxSo/s1600/Esportes+Radicais166_n.jpg',
          title: 'EsporteRadical1',
        },
    ];

    return (
        <>
            <ImageList sx={{ width: 1120, height: 300 }} cols={4} rowHeight={250}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )

}

export default ImageListUser