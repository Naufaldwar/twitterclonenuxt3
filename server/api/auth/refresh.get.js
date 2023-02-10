export default defineEventHandler(async(event)=>{
    const refreshToken = getCookie(event, "refresh_token");
    return{
        hello:refreshToken
    }
})