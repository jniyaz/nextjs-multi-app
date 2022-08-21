import Head from 'next/head'
import Counter from '../features/counter/Counter'

export default function Home() {
  return (
    <section>
      <main className='py-5'>
        <h1 className='text-xl md:text-5xl font-bold py-10 px-10'>Redux Test App</h1>
        <div className='px-10'>
          <Counter />
        </div>
      </main>
    </section>
  )
}
