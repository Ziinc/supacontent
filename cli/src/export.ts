import { makeClient } from "./client"

export const exportConteent = async()=>{
    const client = makeClient()
    const { data, error } = await client.from('supacontent_content').select()
    console.log(data, error)
}