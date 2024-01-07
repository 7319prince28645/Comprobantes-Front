import Body from "./Body";
import Nav from "./Nav";

function HeaderShow() {
  return (
    <table className=" w-full text-center divide-y divide-gray-200 border">
        <Nav />
        <Body/>
    </table>
  );
}

export default HeaderShow;
