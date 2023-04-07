import { PropsWithoutRef } from "react";
import { IHome } from "@pjblog/theme";
import './style.css';

export default function Home(props: PropsWithoutRef<IHome>) {
  return <div onClick={() => console.log('clicked')} className="bgx">{props.configs.blog_name}</div>
}