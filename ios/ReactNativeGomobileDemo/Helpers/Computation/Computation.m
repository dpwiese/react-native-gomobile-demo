//
//  Computation.m
//  ReactNativeGoDemo
//
//  Created by Daniel Wiese on 1/28/2019.
//

#import <Foundation/Foundation.h>
#import "Computation.h"
#import <Sample/Sample.h>

@implementation Computation

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(concatenateStrings: (NSString*)string1
                                with: (NSString*)string2
                            callback: (RCTResponseSenderBlock)callback)
{
  NSString* string3 = SampleConcatenateStrings(string1, string2);

  NSArray *stringArray = @[string3];
  callback(stringArray);
}

RCT_EXPORT_METHOD(addTwoNumbers: (double)num1
                            and: (double)num2
                       callback: (RCTResponseSenderBlock)callback)
{
  double sum = SampleAddTwoNumbers(num1, num2);

  NSMutableArray *array = [[NSMutableArray alloc] initWithCapacity:0];
  [array addObject:[NSNumber numberWithDouble:sum]];

  callback(array);
}

RCT_EXPORT_METHOD(incrementArrayElements: (NSString*)str
                                callback: (RCTResponseSenderBlock)callback)
{
  NSString* string = SampleIncrementSliceElements(str);
  
  NSArray *stringArray = @[string];
  callback(stringArray);
}

RCT_EXPORT_METHOD(solveBVPWithInputs: (NSString*)configString
                            callback: (RCTResponseSenderBlock)callback)
{
  NSString* string = SampleSolveBVPWithInputs(configString);
  
  NSArray *stringArray = @[string];
  callback(stringArray);
}

RCT_EXPORT_METHOD(solveBVPWithoutInputs: (RCTResponseSenderBlock)callback)
{
  NSString* string = SampleSolveBVPWithoutInputs();
  
  NSArray *stringArray = @[string];
  callback(stringArray);
}

@end
