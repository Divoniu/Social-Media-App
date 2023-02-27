import styles from "./RightSide.module.scss";
import { useContext, useEffect, useState } from "react";
import { UsersList } from "./UsersList";
import { UsersControl } from "./UsersControl";
import { UserChat } from "./UserChat";
import DataContext from "../../../context/DataContext";

export function RightSide() {
  const [isOpen, setIsOpen] = useState(false);

  const { listOfChats, fetchUsers } = useContext(DataContext);
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <aside className={styles.rightSide}>
        <UsersControl isOpen={isOpen} setIsOpen={setIsOpen} />
        <UsersList isOpen={isOpen} />
      </aside>
      <section className={styles.userChat}>
        {listOfChats.map((chatData, idx) => (
          <UserChat chatData={chatData} key={idx} idx={idx} />
        ))}
      </section>
    </>
  );
}
