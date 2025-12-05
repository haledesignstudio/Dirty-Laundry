import Head from 'next/head'
import {client} from '../sanity/lib/client'

export default function Home({posts}) {
  return (
    <div>
      <Head>
        <title>Dirty Laundry</title>
      </Head>
      <main>
        <h1>Dirty Laundry</h1>
        <ul>
          {posts.map((p) => (
            <li key={p._id}>{p.title}</li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await client.fetch('*[_type == "post"]{_id, title}')
  return {props: {posts}, revalidate: 10}
}
