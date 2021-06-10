import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      marginBottom: 20
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      minWidth: 300,
    }
  }));

function ArticleItem ({article}) {
    const classes = useStyles();

    const getPublishedDate = (date)=>{
        const time = new Date(date);
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const month = monthNames[time.getMonth()];
        const day = String(time.getDate()).padStart(2, '0');
        const year = time.getFullYear();
        const output = month  + '\n'+ day  + ',' + year;
        return output;
    }

    return (
        <>
        { article?.map((item,index) => {
            const time = getPublishedDate(item.publishedAt)
            return (
                <Card className={classes.root} key={index}>
                    <CardMedia
                        className={classes.cover}
                        image={item.urlToImage ? item.urlToImage : ''}
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                        <Typography component="h6" variant="h6">
                            {item.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {item.description}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom style={{textAlign:'right'}}>
                            {time }
                        </Typography>
                        </CardContent>
                    </div>
                </Card>
            )
        })

        }
        </>
    )
}

export default ArticleItem