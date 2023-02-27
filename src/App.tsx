import { useEffect, useRef, useState } from "react";
import getList from "./api";
import cn from "./App.module.scss";

function App() {
  const [list, setList] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(1);

  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  const getListHandle = () => {
    setLoading(true);
    getList("images/search")
      .then((data: any) => {
        setLoading(false);
        setList((oldData: any): any => {
          return [...oldData, ...data];
        });
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    if (scrollContentRef.current) {
      scrollContentRef.current.addEventListener(
        "scroll",
        (event: Event | any) => {
          const height =
            event.target?.scrollHeight - event.target?.clientHeight;
          const position = event.target.scrollTop / height;
          setScrollPosition(position);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (scrollPosition === 1) {
      getListHandle();
    }
  }, [scrollPosition]);

  return (
    <div className={cn.root}>
      {error && <div className={cn.error}>{error}</div>}
      <div className={cn.wrapper}>
        <div className={cn.list} ref={scrollContentRef}>
          {list.map((el: any, idx: number) => (
            <div className={cn.item} key={el.id}>
              <img src={el.url} alt="cat" />
              {loading && <div className={cn.loader}></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
