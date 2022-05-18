import React, {useState, useMemo} from 'react';
import {IItem} from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
  const initialData = props.initialData;

  const [text, setText] = useState(initialData.map(item => {
    return {name: item.name, id: item.id, change: false}
  }))

  const textHandler = (event: any) => {
    const arr = text;
    arr[event.target.id] = {name: arr[event.target.id].name, id: arr[event.target.id].id, change: true}
    setText([...arr])
  }

  const keyPressHandler = (event: any) => {
    if (event.key === 'Enter') {
      const arr = text;
      arr[event.target.id] = {name: event.target.value, id: arr[event.target.id].id, change: false}
      setText([...arr])
    }
  }

  const keyUpHandler = (event: any) => {
    if (event.key === 'Escape') {
      const arr = text;
      arr[event.target.id] = {name: arr[event.target.id].name, id: arr[event.target.id].id, change: false}
      setText([...arr])
    }
  }

  useMemo(() => {
    if (props.sorting === 'ASC') {
      setText(text.sort((a, b) => a.id > b.id ? 1 : -1))
    }
    if (props.sorting === 'DESC') {
      setText(text.sort((a, b) => a.id < b.id ? 1 : -1))
    }
  }, [props.sorting])

  return (
    <ul>
      {text.map((item, index) => (
        <li key={item.id}>{
          item.change
            ? <input id={`${index}`} type="text" defaultValue={item.name} onKeyPress={keyPressHandler} onKeyUp={keyUpHandler}/>
            : <span id={`${index}`} onClick={textHandler}>{item.name}</span>
        }</li>
      ))}
    </ul>
  );
}
