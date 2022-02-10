import styles from "./styles.module.css";

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const Lista = () => {
        window.location = "/addItem"
    }
    const todo = () => {
        window.location = "/todo"
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.white_btn} onClick={todo}>Todo</button>
                <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
};


export default Main