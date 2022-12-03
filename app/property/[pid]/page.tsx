
// interface ParametersForProperty{
//     pid:string
// }
export default function Page(params:{pid:string}) {
    return <div>{params.pid}</div>;
}
