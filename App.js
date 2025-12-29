import AppBar from './src/components/AppBar';
import FlexboxExample from './src/components/FlexboxExample';
import Main from './src/components/Main';
import StyleTest from './src/components/StyleTest';
import StyleTest2 from './src/components/StyleTest2';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

export default function App() {
  // return (
  //   <>
  //     <StyleTest />
  //     <StyleTest2 />
  //     <FlexboxExample />
  //   </>
  // )
  return (
    <>
      {/* <AppBar /> */}
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  )


}

