import React from 'react'


export const getServerSideProps = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const Prof = await res.json();
    return {
        props: { Prof },
    };
};


export default function Product({ Prof }) {
    return (
            <div>
                {Prof.map((p) => {
            return (
                <div key={p.Prof}>
                    <p>
                        {p.Email}
                        <p>
                        {p.Pass}
                        </p>
                        {p.Campus}
                    </p> 
                </div>
            );
        })}
    </div>
    );
}
