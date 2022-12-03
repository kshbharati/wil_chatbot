import Link from 'next/link'
type MenuItemProps = {
    title: string;
    link: string;
};
let MenuItem = (props: MenuItemProps) => {
    return (
        <>
            <Link
                href={props.link}
                className="text-gray-700 hover:text-indigo-600 text-md"
                {...props}
            >
                {props.title}
            </Link>
        </>
    );
};

export default MenuItem;