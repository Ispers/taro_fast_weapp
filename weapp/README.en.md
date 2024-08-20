# Weapp Taro WeChat Mini Program
Secondary Packaging - Taro Framework Ready to Use Out of the Box
Note: Personally, I think TypeScript is too cumbersome and makes mini programs too bloated, so I use JavaScript for development

* [Taro]( https://taro-docs.jd.com/docs/ )
* [NutUI-React]( https://nutui.jd.com/taro/react/2x/#/zh -CN/guide/intro-react)
* [react-redux]( https://cn.react-redux.js.org/introduction/getting-started/ )

#### Project integration plugin
- @nutui/icons react taro nutui icon library
- @tarojs/extend [a series of APIs similar to jQuery]（ https://taro-docs.jd.com/docs/jquery-like )
- @tarojs/plugin html can use HTML tags
- Redux logger, Redux reverse Redux change tracking and persistence

#### Project construction
Node version>=16 Recommended node versions 18-20
```
# Due to the phantom dependency generated during npm installation (which may have an impact on later project deployment), it is recommended to use pnpm as the package manager
# Configure image acceleration
pnpm config set registry  https://registry.npmmirror.com/

# Install dependencies
pnpm install
# yarn
yarn

# Start Service (WeChat Mini Program)
pnpm run dev:weapp
# yarn
yarn dev:weapp

# Building a production environment
pnpm run build:weapp
# yarn
yarn build:weapp

# Watch and enable compression simultaneously
set NODE_ENV=production && taro build --type weapp --watch # CMD
NODE_ENV=production taro build --type weapp --watch # Bash
```

#### Frequently Asked Questions
During the installation of dependencies, a dependency conflict occurred due to inconsistent versions of the React Native dependency, resulting in the inability to install
Solution:
```
# If there is no React Native requirement, simply ignore the mandatory installation
pnpm install --legacy-peer-deps
```

#### Feedback and communication
QQ communication group: 993719568

#### Inviting Developers
If you also want to contribute to this project, you can contact the author through the following contact information
- qq: 1257032868
- Email: [ 1257032868@qq.com ]( 1257032868@qq.com )