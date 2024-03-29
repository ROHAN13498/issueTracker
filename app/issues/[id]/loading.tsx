import { Card } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssuePage = () => {
  return (
    <div>
       <div>
        <Skeleton className='max-w-xl'/>
        <div className="flex  space-x-3 my-2">
          <Skeleton/>
          <Skeleton/>
        </div>
        <Card className='prose'>
        <Skeleton count={3}/>
        </Card>
    </div>
    </div>
  )
}

export default LoadingIssuePage