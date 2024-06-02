import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbPaths = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return { segment, path };
    });
    console.log(breadcrumbPaths)
    return (
        <div className="flex items-center p-4">
            <ul className="flex space-x-2">
                <li key="home" className="inline-block">
                    <Link to="/" className="text-blue-500 hover:text-blue-700">
                        Home
                    </Link>
                    {breadcrumbPaths.length > 0 && <span className="mx-1">/</span>}
                </li>
                {breadcrumbPaths.map(({ segment, path }, index) => (
                    <li key={path} className="inline-block">
                        <Link to={path} className="text-blue-500 hover:text-blue-700">
                            {segment}
                        </Link>
                        {index < breadcrumbPaths.length - 1 && <span className="mx-1">/</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Breadcrumbs;