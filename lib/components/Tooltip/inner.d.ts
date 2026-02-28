import React from 'react';
declare class InnerContent extends React.Component {
    state: {
        content: string;
    };
    refresh(content?: React.ReactNode): void;
    render(): React.JSX.Element;
}
export default InnerContent;
