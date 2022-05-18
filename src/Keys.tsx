import React, {useLayoutEffect} from 'react';
import {IItem} from './index';
import {useState, useRef} from "react";

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
  const [text, setText] = useState({
    ...props.initialData
  })

  const [inputs, setInputs] = useState({
    ...props.initialData.map(item => {
      return {name: item.name, change: false}
    })
  })

  const textHandler = (event: any) => {
    setInputs(inputs => ({
      ...inputs,
      [event.target.id]: {name: inputs[event.target.id].name, change: true}
    }))
  }

  const inputHandler = (event: any) => {
    setInputs(inputs => ({
      ...inputs,
      [event.target.id]: {name: event.target.value, change: true}
    }))
  }

  const keyPressHandler = (event: any) => {
    if (event.key === 'Enter') {
      setText(text => ({
        ...text,
        [event.target.id]: {name: event.target.value, id: event.target.id}
      }))
      setInputs(inputs => ({
        ...inputs,
        [event.target.id]: {name: event.target.value, change: false}
      }))
    }
  }

  const keyUpHandler = (event: any) => {
    if (event.key === 'Escape') {
      setInputs(inputs => ({
        ...inputs,
        [event.target.id]: {name: text[event.target.id].name, change: false}
      }))
    }
  }

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setText({...Object.keys(text).reverse().map(key => text[+key])})
    setInputs({...Object.keys(inputs).reverse().map(key => inputs[+key])})
  }, [props.sorting])

  return (
    <div>
      {(Object.values(text).map((item: any, index: number) => (
        <>
          {
            inputs[index].change
              ? <input
                key={item.id}
                id={`${index}`}
                type="text"
                defaultValue={inputs[index].name}
                onChange={inputHandler}
                onKeyPress={keyPressHandler}
                onKeyUp={keyUpHandler}
              />
              : <span
                key={item.id}
                id={`${index}`}
                onClick={textHandler}
              >{item.name}</span>
          }
          <br/>
        </>
      )))
      }
    </div>
  );
}
