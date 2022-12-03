
interface ParametersForProperty{
    pid:string
}
export default function Page(params:any) {
    if(params?.pid)
    {
        return <div>{params.pid}</div>;
    }


}

// export async function getStaticProps(params:any){

// }