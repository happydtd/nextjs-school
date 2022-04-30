export default interface Teacher{
    id:number,
    name: string,
    country: string,
    email: string,
    phone: string,
    address: string[],
    education: string,
    profile: Profile,
    skills: Skill[],
  }
  
  interface Profile{
    birthday: Date,
    gender: number,
    createdAt: Date,
    updatedAt: Date,
    description: string,
  }
  
  interface Skill{
    index:number,
    name:string,
    level:number,
  }