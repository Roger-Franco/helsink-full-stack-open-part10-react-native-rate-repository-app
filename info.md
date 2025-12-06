npx create-expo-app rate-repository-app --template expo-template-blank@sdk-50

npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/metro-runtime@~3.1.1

npm install expo@^54.0.0
npx expo install --fix 
npx expo-doctor 

******** eslint: ********
npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-native

.eslint.json
{
  "plugins": ["react", "react-native"],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "@babel/eslint-parser",
  "env": {
    "react-native/react-native": true
  },
  "rules": {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}

Add in script: "lint": "eslint ./src/**/*.{js,jsx} App.js --no-error-on-unmatched-pattern" 

npx @eslint/migrate-config .eslintrc.json 

******** eslint: ********