// Objective-C API for talking to github.com/dpwiese/go-gomobile-demo Go package.
//   gobind -lang=objc github.com/dpwiese/go-gomobile-demo
//
// File is generated by gobind. Do not edit.

#ifndef __Sample_H__
#define __Sample_H__

@import Foundation;
#include "Universe.objc.h"


FOUNDATION_EXPORT double SampleAddTwoNumbers(double num1, double num2);

FOUNDATION_EXPORT NSString* SampleConcatenateStrings(NSString* string1, NSString* string2);

FOUNDATION_EXPORT NSString* SampleIncrementSliceElements(NSString* str);

FOUNDATION_EXPORT NSString* SampleSolveBVPWithInputs(NSString* configString);

FOUNDATION_EXPORT NSString* SampleSolveBVPWithoutInputs();

#endif
