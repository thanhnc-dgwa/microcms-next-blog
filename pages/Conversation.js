import { client } from "../libs/client";
import Image from "next/image";
import clsx from "clsx";
import styles from '../styles/Home.module.scss';

//SSG
export const getStaticProps = async () => {
    const data = await client.get({endpoint: 'interview',contentId: 'idm2to9lgk',});
    console.log(data);
    return {
        props: {
            interview: data,

        }
    }
}

const Conversation = ({interview}) => {
    return (
        <main className={styles.main}>

            <h1 className={styles.title}>{interview.title}</h1>
            
            {interview.body && interview.body.map((elm, id) => (
                <div key={id}>
                    {elm.fieldId === 'normalText' &&
                        <div className={styles.normalText} dangerouslySetInnerHTML={{ __html: `${elm.text}` }}></div>
                    }

                    {elm.fieldId === 'talkText' &&
                        <div className={clsx(styles.talkText, !elm.isLeft && styles.reverse)}>
                            <div className={styles.person}>
                                <Image src={elm.image.url} alt={''} width={60} height={60}></Image>
                                <div>{elm.name}</div>
                            </div>
                            <div className={styles.body} dangerouslySetInnerHTML={{ __html: `${elm.text}` }}></div>
                        </div>
                    }
                </div>
            ))}

        </main>
    )
}

export default Conversation
  

