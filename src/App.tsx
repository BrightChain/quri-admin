import { PostList, PostShow, PostCreate, PostEdit } from "./posts";
import { Admin, Resource } from "react-admin";
import AppCheckApp from "./AppCheckApp";

class App<P = unknown, S = unknown, SS = any> extends AppCheckApp<P, S, SS> {
  constructor(props: Readonly<P> | P) {
    super(
      {
        logging: true,
        rootRef: "/",
        watch: ["posts"],
      },
      props
    );
  }
  render() {
    return (
      <Admin dataProvider={this.dataProvider} authProvider={this.authProvider}>
        <Resource
          name="posts"
          list={PostList}
          show={PostShow}
          create={PostCreate}
          edit={PostEdit}
        />
      </Admin>
    );
  }
}

export default App;
