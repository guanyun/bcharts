import React from 'react';
interface IEffectsProps {
    children?: React.ReactNode | ((chart: any) => React.ReactNode);
}
export default function Effects(props: IEffectsProps): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
export {};
