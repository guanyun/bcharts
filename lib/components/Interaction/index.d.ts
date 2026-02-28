import React from 'react';
import { InteractionOption } from '@antv/g2/lib/interface';
export interface IInteractionProps extends InteractionOption, React.PropsWithChildren<{}> {
    type: string;
    config?: object;
}
export default function Interaction(props: IInteractionProps): any;
