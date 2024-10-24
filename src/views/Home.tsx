import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  //SafeAreaView,
  Text,
  View,
} from 'react-native';

type NavbarProps = PropsWithChildren<{
  title: string;
}>;

function Home({children, title}: NavbarProps): React.JSX.Element {
  return (
    <>
			<View className="sticky inset-x-0 top-4 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start" >
        <View className="relative mt-4 mx-20 w-500 rounded-[36px] border border-yellow-100/40 bg-yellow-50/60 px-4 py-3 backdrop-blur-md">
          <Text>
            {title}
          </Text>
          {children}
        </View>
			</View>
		</>
  );
}

export default Home;
