# image-editing starter

A starter template for students working on a simple set of "Image Editing" code in a functional environment! Read over this "how to" guide to get started, then work your way through the [Challenges](./CHALLENGES.md).

## Adding Filters

Your job will be to add "filters" to our project. All of that code should be created in the `src/filters` subdirectory.

Each time you add a filter, export it from its own file and then make sure to add it to the list of filters in `src/filters/index.tsx`
in order to make it show up in the user interface.

Note: there are some template files in the `src/filters/` folder to help
you get started.

### My First Filter

To get started, let's try adding a simple "brighten" filter that brightens the image.

Create a new file called `src/filters/brighten.tsx` -- you can do so by copying
`src/filters/_templateVanillaFilter.tsx` to save you a little time.

In that file, we will need to create our starter filter code, like so:

```typescript
import type { Filter } from "../types"; /* Import our Filter type */

export const brightenFilter: Filter = {
  /* The name of our filter */
  name: "Brighten",
  /* The function that actually does the work */
  apply: (pixels, width, height) => {
    // Our work to modify the image will go here!
    return pixels;
  },
};
```

Then, in `src/filters/index.tsx` we need to import the filter and add it to the list of filters
the app uses, like so...

```typescript
import {brightenFilter} from './brighten';

...

const filters : Filter[] = [brightenFilter, roseColoredGlasses, grid, vignette]
```

At this point, you should run the code and you should see a filter called "border." If you click "Apply Add Border" it will run your code, but you should see nothing change since currently you just return the unmodified set of pixels.

#### Writing your Filter

The pixels data is simply an array of numbers. Each number is a value between 0 and 255 and we have a Red, Green, Blue
and Alpha value. For our first "brighten" filter, we can simply add a number to every single value. Because we are
working with a Clamped Array, JavaScript will make sure that any numbers we produce _outside_ of the range get "clamped", so, for example, if we try to add 50 to the value 220, we will get 255 instead of 270.

```typescript
import type { Filter } from "../types"; /* Import our Filter type */

export const brightenFilter: Filter = {
  /* The name of our filter */
  name: "Brighten",
  /* The function that actually does the work */
  apply: (pixels, width, height) => {
    // Our work to modify the image will go here!
    for (let i = 0; i < pixels.length; i++) {
      pixels[i] = pixels[i] + 50;
    }
    return pixels;
  },
};
```

## Working with pixels

In the brighten filter, we changed every value (red, green, blue, alpha), not caring what it was. Usually, we'll care about the details. For this reason, it can be useful to iterate through the array one pixel at a time rather than one value at a time. Since the array always contains R,G,B,A values in that order, we can move through the array by looking at every fourth value, like this...

```typescript
for (const redIndex = 0; i < pixels.length; i += 4) {
  // Our "red" value is redIndex...
}
```

If we wanted to add a "purple" hue by updated only red and blue values, we could do this...

```typescript
for (const redIndex = 0; i < pixels.length; i += 4) {
  // Our "blue" index is 2 more than red
  // since we go R,G,B,A
  const blueIndex = redIndex + 2;
  pixels[redIndex] += 50;
  pixels[blueIndex] += 50;
}
```

If we insert that code into our filter, we will add a "purple" hue to the image.

You can see this technique applied in the [rose colored glasses](./src/filters/samples/roseColoredGlasses.tsx) filter.

## Working with rows, columns and pixels

If we need to know not just _what_ a value is (red, green, blue), but _where_ it is, we can use for loops to iterate through rows and columns and then we can use a little math to find the correct values, like so:

```typescript
  ...
  apply : (pixels, width, height) => {
    for (let row=0; row<height; row++) {
      for (let col=0; col<width; col++) {
        // Each pixel is 4 items wide and each row
        // is COLUMN pixels wide, so...
        // our position is
        // (ROW * (4 * WIDTH) + (COL * 4)
        const redIndex = row * 4 * width + col * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;
        // Now we can do something with these pixel indices...
        // ...
      }
    }
    return pixels;
  }

```

## Working with Options

We have an infrastructure for displaying options to the user. Using this involves two parts: (1) defining the options that will be displayed to the user (2) specifying the type of options you expect your `apply` method to get back when the filter is applied. Take a look at [the template with options](./src/filters/_templateWithOptions.tsx) for some starter code.

You can see a good example of this in the [grid](./src/filters/samples/grid.tsx) sample filter.

### Defining Options we Expect

You can get options including a color (as a hex string), a boolean (true|false), or a number. You can name your options whatever you like, and if you provide these options as a type to the `Filter` type, you will get type hinting in your `apply` function.

For example, if I wanted to make a "border" filter which added
a border with a width and a color, I could write the following...

```typescript
type BorderOptions = {
  width: number;
  color: string;
}


const borderFilter : Filter<BorderOptions> = {
  ...
}
```

### Providing the Options in our Filter Object

In order to let the user modify options, we need to provide a list of options to display, which the app will then let the user provide. That is provided in the `options` property of our `Filter` object, and we can define it like so:

```typescript
type BorderOptions = {
  width: number;
  color: string;
}


const borderFilter : Filter<BorderOptions> = {
  name : 'Border',
  apply : (pixels, width, height, options) => {
    ... filter logic here ...
  },
  options : [
    {
      name : 'width',
      type : 'integer',
      default: 20,
      min: 0
    },
    {
      name : 'color',
      type : 'color',
      default: '#000000'
    }
  ]
}
```
