# Overview
So, what does pstr mean? It comes from **P**arse **STR**ing (I know, kind of silly, but the project is mine 😅). This was part of my small **journey learning Golang**, and it became another project to practice with. This time, I already had a bit more experience compared to my earlier projects, so I wanted to tackle something I had **been curious** about for a while: **a regex engine.**

I always wondered how one really works and if it was as difficult as I imagined. In theory, I already knew the steps: **parse the string**, **create an NFA**, and then **check it against another string**. But theory is one thing, and I wanted to see how it actually felt to build it myself. On top of that, I wanted to spend some time focusing more seriously on **error handling** and **testing**.

# Technologies and Categories
- Golang
- Regex - Regular Expressions
- Testing

# What did I do?
I started by implementing the **parsing**, then I implemented **creating the NFA** based on the parsed tokens, and after that I added the **check()** function to test strings against it. Once the core application was working, I deployed it to [Railway]() using their free plan. After deployment, I integrated it into **this portfolio** at [here](https://rubuy.me/playground/pstr).

# What have I learned?
I definitely **learned a fair amount of Golang** through this project. On top of that, I had to deal with some CORS issues. At first, I had problems with the integration between the website and the Railway deployment, but in the end it was mostly me being a bit careless. I also got to practice **good habits around error handling and testing in Go**, which was a big plus.

# Would I do something differently?

If I could redo the project, I would spend more time writing functions with **proper error handling and edge case coverage** before moving on to the next step. Another thing I could have done better is **writing tests right after building each functionality**. That way, I could check what might go wrong earlier instead of waiting until the end.

