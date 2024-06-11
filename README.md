---
runme:
  id: 01HWVRP2RNGNZZ5QP1K6C7M1PJ
  version: v3
---

# React + Vite

```sh {"id":"01HX126AM6FDVAJJZZ40SFKXZM"}
UseMemo and useCallback function where 
UseMemo is memorize the value of function 
useCallback is memorize the function it's self

=> const [userName,setUserName] = useState('');
=> const [randomInput, setRandomInput] = useState('');
=> const fib = useCallback((n) => {return (n <= 1) ? n : fib(n-1)+fib(n-2)},[]);
=> const fibNumber = useMemo(() => fib(userNumber), [userNumber,fib]);
React.useEffect(() => {
    console.log("New Array")
},[fibNumber])
```

```sh {"id":"01HX124TVBSBXEYJNAGGAXBV36"}
https://rsuitejs.com/resources/templates/
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
   -[formation/object]  (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy) for code simple
