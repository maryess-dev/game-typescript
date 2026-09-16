import { topics } from "../api/mocks/topics"


export const TopicsChoicer = () => {
    return (
            <section className="justify-center items-center grid grid-cols-2 gap-8 border border-gray-300 h-full p-8">
                {
                    topics.map((t)=> (
                        <div className="bg-red-50 py-6 rounded-xl">
                            <img src={t.imageSrc} alt="" className="px-4 rounded-xl max-w-full max-h-full" />
                            <span>
                                {t.name}
                            </span>
                            <p> 
                                {t.description}
                            </p>
                            <button 
                            onClick={()=>{

                            }}
                            className="border border-gray-200 rounded-2xl p-2 bg-red-300 text-center cursor-pointer">
                                перейти
                            </button>
                        </div>
                    ))
                }
            </section>
    )
}