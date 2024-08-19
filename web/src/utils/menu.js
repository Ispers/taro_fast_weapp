import { Navigate } from 'umi';
import React from "react";

/**
 * 根据extraRoutes修改路由
 * 
 * @param { Routes } routes 
 * @param { Array } extraRoutes 
 * @returns void
 */
export const patch = (routes, extraRoutes) => {
    // 找到'/'根路由下的routes信息
    const routerIndex = routes.findIndex(item => item.path === '/')
    const parentId = routes[routerIndex].id

    if (extraRoutes) {
        routes[routerIndex].routes = [];
        routes[routerIndex].children = [];

        routes[routerIndex].routes.push(
            ...loopMenuItem(extraRoutes, parentId)
        )
        routes[routerIndex].children.push(
            ...loopMenuItem(extraRoutes, parentId)
        )

        // 添加 '/' 重定向到 排序为1 的页面
        routes[routerIndex].routes.unshift({
            path: '/',
            element: <Navigate to={extraRoutes.find(item => item.sort === 1)?.url} replace />,
        });
        routes[routerIndex].children.push({
            path: '/',
            element: <Navigate to={extraRoutes.find(item => item.sort === 1)?.url} replace />,
        })
    }
};


/**
 * 递归遍历生成patchClientRoutes所需的路由格式信息（递归生成全部子路由）
 * 
 * @param { MenuItem[] } menus 
 * @param { number | string } pId 
 * @returns RouteItem[]
 */
export const loopMenuItem = (menus, pId) => {
    return menus.flatMap((item) => {
        let Component = null;

        if(item.type == 1){
            return;
        }

        if (item.page) {
            // 防止配置了路由，但本地暂未添加对应的页面，产生的错误
            Component = React.lazy(() => new Promise((resolve, reject) => {
                import(`@/pages${item.page}.jsx`)
                    .then(module => resolve(module))
                    .catch((error) => resolve(import(`@/pages/404.jsx`)))
            }))
        }

        if (item.children) {
            return [
                {
                    path: item.url,
                    title: item.menuName,
                    icon: item.icon,
                    id: item.menuId,
                    parentId: pId,
                    sort: item.sort,
                    hidden: item.hidden,
                    routes: [
                        {
                            path: item.url,
                            element: <Navigate to={item.children[0].url} replace />,
                        },
                        ...loopMenuItem(item.children, item.menuId)
                    ],
                    children: [
                        {
                            path: item.url,
                            element: <Navigate to={item.children[0].url} replace />,
                        },
                        ...loopMenuItem(item.children, item.menuId)
                    ]
                }
            ]
        } else {
            return [
                {
                    path: item.url,
                    element: (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            {Component && <Component />}
                        </React.Suspense>
                    ),
                    title: item.menuName,
                    icon: item.icon,
                    id: item.menuId,
                    parentId: pId,
                    sort: item.sort,
                    hidden: item.hidden
                }
            ]
        }
    })
}
