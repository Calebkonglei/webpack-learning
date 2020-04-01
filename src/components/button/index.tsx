import React from 'react';
import './style';

const Props = {
    label: ''
}

type Iprops = Required<typeof Props>;

const Button = (props: Iprops) => {
return <div data-testid="button" className="button-style">{props.label}</div>
}

export default Button;