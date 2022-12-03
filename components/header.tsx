import Menu from '@components/Menu/menu'
// export default class HeaderComponent extends React.Component<any, any>{
//     constructor(props:any,state:any){
//         super(props);
//     }

//     render(){
//         return (
//             <div>
//                 <p>This is Header</p>
//             </div>
//         );
//     }
// }


export default function HeaderComponent(){
            return (
            <>
                <header className="header sticky top-0 z-50">
                    <nav className="shadow">
                        <div className="flex justify-between items-center py-6 px-10 container mx-auto">
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-tr from-indigo-600 to-green-600 bg-clip-text text-transparent hover:cursor-pointer">
                                    BUY WITH US
                                </h1>
                            </div>
                            <div className="hover:cursor-pointer sm:hidden">
                                <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
                                <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
                                <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
                            </div>

                            <Menu />
                            <div></div>
                        </div>
                    </nav>
                </header>
            </>
        );
}