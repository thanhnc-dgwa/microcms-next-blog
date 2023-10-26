import Link from "next/link";
import { client } from "../../libs/client";
import styles from '../../styles/Home.module.scss';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id });

    return {
        props: {
            blog: data,
        }
    }
};

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog"});
    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return {
        paths,
        fallback: false,
    };
};

export default function BlogId({blog}) {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link href="/">＜ 戻る</Link>
                </div>
            </header>
            <main className={styles.main}>
                <h1 className={styles.title}>{blog.title}</h1>
                <p className={styles.publishedAt}>{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD HH:MM')}</p>
                <p>カテゴリ: {blog.category && blog.category.name}</p>
                <div dangerouslySetInnerHTML={{__html: `${blog.body}`}} className={styles.post}></div>
            </main>
        </>
    )
};